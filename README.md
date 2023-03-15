# CIS4301-Group-11 - Main

## Initial Steps

### Cloning the repo

- Make a folder somewhere on your computer
- `cd` to that folder from the command line
- Run `git@github.com:GoonerBrian/CIS4301-Group-11.git` to clone the repo

### Connect to the University of Florida VPN

Connect to the [University of Florida VPN](https://it.ufl.edu/ict/documentation/network-infrastructure/vpn/)

### Pulling in the latest changes to your local environment
If changes are made in the repo, you will need to pull those changes in by doing the following:
- `cd` to the `CIS4301-Group-11` directory (if not already there)
- Run `git pull origin main`

### Contributing

All work needs to be commited and pushed on a branch other than main. Creating a branch can be done in 2 different ways.

#### Option 1: Create branch from terminal
From the `CIS4301-Group-11` directory run `git checkout -b <branch-name>` (i.e., `git checkout -b this-is-my-branch`). This will 
automatically switch you and all of you changes over to your new branch. See **Pushing your changes to the repo** for the alternate `push` command you will need 
to run.

#### Option 2: Create branch in Github and pull into you local repo
* Login to Github and go to `code` -> `branches`
* Click the `New Branch` button
* Name the branch whatever you like
* Complete steps from **Section 4**
* Run `git checkout <branch-name>` (i.e., `git checkout this-is-my-branch`)

### Pushing your changes to the repo
If you've made changes locally and you want to commit and push those changes to the repo, do the following:
* `cd` to the `CIS4301-Group-11` directory (if not already there)
* Run `git add .` to stage all changed files
* Run `git commit -m "your commit message"` to commit your local changes
* Run `git push` to push your changes to the repo (If you created your branch through the terminal, an error will pop up with the alternative command that you need to run the first time you push changes from this branch. The command will look like this, `git push --set-upstream origin <branch-name>`. Any additional pushes from this branch will only require the `git push` command.) 


## Backend Setup

Please see the README.md in the `backend` folder for instructions on setting up the backend that can be found [here](https://github.com/GoonerBrian/CIS4301-Group-11/blob/main/backend/README.md).

## Frontend Setup

Please see the README.md in the `frontend` folder for instructions on setting up the frontend that can be found [here](https://github.com/GoonerBrian/CIS4301-Group-11/blob/main/frontend/README.md).

## Setup on Apple Silicon Macs

Please see [this](https://github.com/GoonerBrian/node-oracledb-on-m1-mac) repo for instructions on setting up your Apple Silicon Mac to run this app locally.











git bash download:
https://git-scm.com/downloads

NVM for Windows:
https://github.com/coreybutler/nvm-windows/releases

ssh key:
https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key

VS Code:
https://code.visualstudio.com/docs/?dv=win

UF VPN:
https://it.ufl.edu/ict/documentation/network-infrastructure/vpn/anyconnect-installation--configuration-guide/
https://net-services.ufl.edu/provided-services/vpn/clients/

Oracle Instant Client:
https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html

Microsoft Visual C++ Redistributable:
https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170

Resolve error in Frontend on npm install command:
https://stackoverflow.com/questions/52823393/react-scripts-is-not-recognized-as-an-internal-or-external-command