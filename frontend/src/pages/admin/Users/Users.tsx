import {Header} from "../../general/Header.tsx";
import {User} from "../../../models/user-for-admin.ts";
import {useEffect, useState} from "react";
import {useLazyGetAllUsersQuery} from "../../../store/backendAPI/backend.api.ts";

export function Users() {
    const [users, setUsers] = useState<User[]>();
    const [getAllUsers, {isLoading, isError}] = useLazyGetAllUsersQuery();
    const [error, setError] = useState<string>();

    const initUsers = async () => {
        const res = await getAllUsers('');
        if ('data' in res) {
            setUsers(res.data);
        } else {
            // @ts-ignore
            setError(res.error?.message)
        }
    }

    useEffect(() => {
        initUsers();
    }, []);
    return (
        <>
            <Header/>
            <main
                className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-center items-center overflow-y-hidden">
                <div className="mt-10 mx-auto grid grid-cols-4">
                    {
                        users?.map((item: User) => (
                                <div
                                    className="flex flex-col items-start justify-center w-[250px] rounded-2xl bg-white text-black font-normal m-2">
                                    <p className="ml-10 text-black text-lg mt-2"><span
                                        className="font-custom">User id: </span>
                                        {item.id}
                                    </p>
                                    <p className="ml-10 text-black text-lg my-2"><span
                                        className="font-custom">User name: </span>
                                        {item.firstName}
                                    </p>
                                    <p className="ml-10 text-black text-lg my-2"><span
                                        className="font-custom">User last name: </span>
                                        {item.lastName}
                                    </p>
                                    <p className="ml-10 text-black text-lg my-0.5"><span
                                        className="font-custom">User email: </span>
                                        {item.email}
                                    </p>
                                </div>
                            )
                        )
                    }
                </div>
                {!users && <p className="text-white font-custom text-2xl mx-auto mt-10">No users yet</p>}
                {isLoading && <p className="text-white font-custom text-2xl mx-auto mt-10">Loading...</p>}
                {isError && <p className="text-white font-custom text-2xl mx-auto mt-10">{error}</p>}
            </main>
        </>
    );
}
