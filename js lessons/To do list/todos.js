let option =  "new";

let list = [];

while(option !== "quit") {
    option = prompt("What would you like to do?");

    if(option === "new") {
        let toDo = prompt("Enter new todo");
        list.push(toDo);
        console.log(toDo + " added to the list!");
    }
    else if(option === "list") {
        console.log("**********")
        for(let i = 0; i < list.length; i++) 
            console.log(i + ". " + list[i] + "\n");
        console.log("**********")
    }
    else if(option === "delete") {
        let position = parseInt(prompt("Enter the index of todo to delete"));
        if (position >= 0  && position <= list.length) {
            list.splice(position - 1, 1);
            console.log("**********")
            console.log("Todo Removed");
            console.log("**********")
        } else 
            console.log("Unknown index");
    } else 
        break;
}

console.log("Ok quit the app!");
