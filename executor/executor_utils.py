import docker
import os
import shutil
import uuid

from docker.errors import APIError
from docker.errors import ContainerError
from docker.errors import ImageNotFound

# create a new folder called TMP in current directory
CURRENT_DIR = os.path.dirname(os.path.relpath(__file__))
TMP_BUILD_DIR = "%s/TMP/" % CURRENT_DIR

# initialize a docker container
client = docker.from_env()
IMAGE_NAME = 'porquell/repo1'
CONTAINER_NAME = "%s: latest" % IMAGE_NAME

# commands in the terminal
# build source files; run binaries
SOURCE_FILE_NAMES = {
    "java" : "Example.java",
    "python": "example.py"
}

BINARY_NAMES = {
    "java": "Example",
    "python": "example.py"
}

BUILD_COMMANDS = {
    "java":"javac",
    "python": "python3"
}

EXECUTE_COMMANDS ={
    "java":"java",
    "python":"python3"
}

# load docker images
def load_image():
    try:
        client.images.get(IMAGE_NAME)
        print("Image exists locally")
    except ImageNotFound:
        print("Image not found locally: loading from docker")
        client.images.pull(IMAGE_NAME)
    except APIError:
        print('docker hub go die')
        return
    print("image loaded")
# make new directories
def make_dir(dir):
    try:
        os.mkdir(dir)
    except OSError:
        print('go die')

def build_and_run(code, lang):
    result = {'build':None, 'run': None, 'error': None}
    # use uuid to create unique file name
    source_file_parent_dir_name = uuid.uuid()
    # cur_dir/tmp/uuid
    source_file_host_dir = '%s/%s' % (TEMP_BUILD_DIR, source_file_parent_dir_name)
    # test/uuid
    source_file_guest_dir = "/test/%s" % (source_file_parent_dir_name)
    make_dir(source_file_host_dir)

    # write code into host folder, e.g.cur_dir/tmp/uuid/java
    with open("%s/%s" %(source_file_host_dir, SOURCE_FILE_NAMES[lang]), 'w') as source_file:
        source_file.write(code)

    # build the code
    try:
        client.containers.run(
            image = IMAGE_NAME,
            command = "%s %s" % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
            # bind host folder with guest(test)folder
            # bind The path to mount the volume inside the container
            volumes = {source_file_host_dir: {'bind':source_file_guest_dir, 'mode':'rw'}},
            # working_dir (str) – Path to the working directory.
            working_dir = source_file_guest_dir
        )
        print('source built')
        result['build'] = 'OK'
    except ContainerError as e:
        result['build'] = str(e.stderr, 'utf-8')
        shutil.rmtree(source_file_host_dir)
        return result

    # run the code
    try:
        log = client.containers.run(
            image = IMAGE_NAME,
            command = "%s %s" % (EXECUTE_COMMANDS[lang], BINARY_NAMES[lang]),
            volumes = {source_file_host_dir:{'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir = source_file_guest_dir
        )
        log = str(log, 'utf-8')
        result['run'] = log
    except ContainerError as e:
        result['build'] = str(e.stderr, 'utf-8')
        shutil.rmtree(source_file_host_dir)
        return result

    shutil.rmtree(source_file_host_dir)
    return result

# "javac Example.java"
# "java Example"
#
# "python3 example.py"
# "python3 example.py"
