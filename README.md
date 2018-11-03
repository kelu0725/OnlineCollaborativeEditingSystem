Read me
# Deployment Environment

# Install Node.js & npm
There are two options to install Node.js. You may install Node.js either by downloading it from Node.js website, or by installing a Node Version Manager (NVM) (Recommended). 

If you download and install Node.js from its website, it can cause permissions errors when you try to install a package globally (e.g.: npm install -g nodemon, npm install -g @angular/cli), because the Node.js installation process installs npm in a directory that only has local permissions. 

## Install nvm for Mac OS
1.To install or update nvm, you can use the install script (install.sh) using curl:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
This command loads nvm: 
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
To verify the installation, type the command below, which should output 'nvm' if the installation was successful. 
```command -v nvm```
Or, you can run nvm --version, which should return the version of nvm installed.

## Install / Reinstall Node.js with NVM
Install the latest version with: nvm install node</br>
Use the latest version with: nvm use node</br>
Install the latest LTS version with: nvm install --lts (Recommended for most users)</br>
Use the latest LTS version with: nvm use --lts (Recommended for most users)</br>

## Uninstall Node.js & npm You’ve Installed (Optional)
If you haven’t had Node.js installed yet, just skip this. If you’ve installed Node.js with executable file downloaded from the Node.js website, you need to uninstall Node.js and npm before reinstall them with NVM. 
I used this command below to remove node and npm-related resources.  you may follow the instructions on npm: npm - removal. 
```
sudo npm uninstall npm -g
```
Usually, the above instructions are sufficient. That will remove npm, but leave behind anything you've installed. If that doesn't work, you can try:
```
sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}
```
### Install nodemon 🔗
npm install -g nodemon

### Install Angular CLI🔗
Prerequisites: Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together with npm 3 or higher.
npm install -g @angular/cli
To verify that Angular CLI has been installed, run: 
```
ng -v
```


Nodemon
sudo npm install -g nodemon</br>
使用npm 安装nodemon组件
Angular5n</br>
Install nvm to install angular-cli(recommended)</br>
sudo npm install -g @angular/cli@latest
安装最新版本的 angularcli
