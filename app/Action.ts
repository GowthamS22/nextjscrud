"use server";

import { getXataClient } from "@/src/xata";
import { revalidatePath } from "next/cache";

const xata = getXataClient();

export interface User {
    id: string;
    name: string,
}

export async function CreateUser(user: User) {
    const record = await xata.db.Users.create({
        name: user.name,
    });
    revalidatePath('/');
    return record.toSerializable() as unknown as User;
}

export async function GetUsers() {
    const records = await xata.db.Users.getAll();
    return records.map(
        (record)=> record.toSerializable() as unknown as User
    );
}

export async function UpdaetUser(user: User) {
    const record = await xata.db.Users.update(user.id,{
        name: user.name
    });
    return record?.toSerializable() as unknown as User;
}

export async function deleteUser(userid: string) {
    const record = await xata.db.Users.delete(userid);
    revalidatePath('/');
}