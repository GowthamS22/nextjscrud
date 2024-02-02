"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreateUser, UpdaetUser, User, deleteUser } from "../Action";
import { Edit, Trash } from "lucide-react";

interface PageProps {
    users: User[];
}

const UserForm = ({users}:PageProps) => {

    const [username, setUsername] = useState<string>("");
    const [edituser, setEdituser] = useState<string>("");
    
    const handleCreateUser = () => {
        CreateUser({
            id: "",
            name: username,
        });
    }

    const handleDelete = (userid: string) => {
        deleteUser(userid);
    }

    const handleEdit = (userid: string) => {
        setEdituser(userid);
    }

    const handleUpdateUser = (username: string) => {
        UpdaetUser({
            id: edituser,
            name: username,
        });
      }

    return (
        <div>
            {users.map((user)=> {
                return (
                    <div key={user.id} className="p-5 border-2 space-x-2 flex">
                        <Input 
                            type="text"
                            defaultValue={user.name}
                            readOnly={edituser === user.id ? false : true}
                            onChange={(e)=>handleUpdateUser(e.target.value)}
                        />
                        <Button className="p-2" onClick={()=>handleEdit(user.id)}><Edit /></Button>
                        <Button onClick={()=>handleDelete(user.id)} className="p-2"><Trash /></Button>
                    </div>
                );
            })}
            <div className="p-5 border-2 flex space-x-2">
                <Input
                    type="text"
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <Button onClick={handleCreateUser} >Save</Button>
            </div>
        </div>
    );
}
 
export default UserForm;