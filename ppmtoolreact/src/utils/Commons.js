export const getId = ({ history }, urlPath) => {
    const path = history.location.pathname;
    console.log(`Path >> ${path}`);
    console.log(`URL Path >> ${urlPath}`);
    let id;
    if(path.includes(`/${urlPath}`))  {// workaround to get correct params
        const pathSplit = path.toString().split("/");
        id = pathSplit[pathSplit.length - 1];
        console.log(`Id >> ${id}`);
    }
    return id;
};

export const boardAlgo = (errors, project_tasks) => {
    if(project_tasks.length < 1) {
        if(errors.projectNotFound) {
            return (
                <div 
                    className='alert alert-danger text-center' 
                    role={"alert"}>
                        {errors.projectNotFound}
                </div>
            );
        } else {
            return (
                <div 
                    className='alert alert-info text-center' 
                    role={"alert"}>
                        No Project Tasks on this board.
                </div>
            );
        }
    } else {
        return;
    }
};