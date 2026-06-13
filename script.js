let todo=[];
let req=prompt("please enter your request");
while(true)
    {
        if(req=="quit")
        {
            console.log("quiting app");
            break;
        }
        if(req=="list")
        {
            console.log("---------------");
            for(let i=0;i<todo.length;i++)
            {
                console.log(i+1,todo[i]);
            }
            console.log("---------------");
        }
        else if(req=="add")
        {
            let task=prompt("enter your task to be added");
            todo.push(task);
            console.log("task added");
        }
        else if(req=="delete")
        {
            let idx=prompt("enter task index to be deleted");
            todo.splice(idx-1,1);
            console.log("task deleted");
        }
        else{
            console.log("wrong request");
        }
        req=prompt("please enter request");
    } 