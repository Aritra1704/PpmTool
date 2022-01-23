export const getId = ({ history }, urlPath) => {
    const path = history.location.pathname;
    let id;
    if(path.includes(`/${urlPath}`))  {// workaround to get correct params
        const pathSplit = path.toString().split("/");
        id = pathSplit[pathSplit.length - 1];
    }
    return id;
}