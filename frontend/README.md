# CIS4301-Group-11 - FrontEnd

## Note

This assumes that you have already completed the instructions in the [backend README](https://github.com/GoonerBrian/CIS4301-Group-11/blob/main/backend/README.md).

## Installing Node Packages

Open a new terminal and run `cd frontend`. Run `nvm use 14.21.2` to ensure you're using the correct version of Node. Then run `npm install` to install the required Node packages.

## Start Web App

Still in the `frontend` directory, run `npm run start`. Once the UI is running, the app should launch in your default browser and the following line should appear in the terminal,

```
webpack compiled successfully
```

If you get errors when trying to run `npm run start`, delete the `package-lock.json` file and `node_modules` directory. Afterwards, run `npm install` again and re-run `npm run start`. [This](https://stackoverflow.com/questions/52823393/react-scripts-is-not-recognized-as-an-internal-or-external-command#:~:text=There%20is%20some%20issue%20in%20npm%20install%20which%20is%20not%20able%20to%20complete%20the%20installation%20of%20react%20scripts.%20Follow%20these%20simple%20steps%20to%20get%20it%20worked.) is a Stack Overflow posting that I used to resolve the issue.

In the web browser, you should be in the Home page. Navigate to `Queries Page` and click on `Sanity Check`. If there is data after the line `This is the query result:`, you have successfully step up your environment.
