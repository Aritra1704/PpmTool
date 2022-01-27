export const getId = ({ history }) => {
    const path = history.location.pathname;
    return path.toString().split("/");
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