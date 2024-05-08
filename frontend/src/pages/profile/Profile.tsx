import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Header} from "../general/Header.tsx";
import {useActions} from "../../hooks/useActions.ts";
import {useUpdateUserMutation} from "../../store/backendAPI/backend.api.ts";
import MyInput from "../general/MyInput.tsx";
import {Model} from "../../models/car-model.ts";
import {CreateUserDto} from "../../models/dto/user/create-user.dto.ts";

export function Profile() {
    const {user, carModels} = useAppSelector(state => state.backend);
    const {setUser, clearUser} = useActions();
    const [firstName, setFirstName] = useState<string>(user?.firstName!);
    const [lastName, setLastName] = useState<string>(user?.lastName!);
    const [email, setEmail] = useState<string>(user?.email!);
    const [password, setPassword] = useState<string>('');
    const [selectedModelId, setSelectedModelId] = useState<string>(user?.dto_car_model_id!);
    const [error, setError] = useState<string | undefined>();
    const [updateUser, {isLoading, isError}] = useUpdateUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleUpdate = async () => {
        setError(undefined);

        if (!validatePasswordStrength()) {
            setError('Password has to include at least one digit, one special character and one uppercase letter');
            return;
        }

        const createUserDto: CreateUserDto = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dto_car_model_id: selectedModelId,
            dto_user_role: 'CLIENT'
        }

        const res = await updateUser({body: createUserDto, userId: user?.id!});
        if ('data' in res) {
            setUser(res.data);
            navigate('/profile')
        } else if ('error' in res) {
            // @ts-ignore
            setError(res.error.message)
        }
    }

    const validatePasswordStrength = (): boolean => {
        const hasSpecialCharacter: boolean = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        const hasUppercaseLetter: boolean = /[A-Z]/.test(password);
        const hasDigit: boolean = /[0-9]/.test(password);
        const hasMinimumLength: boolean = password.length >= 8;

        return hasSpecialCharacter && hasUppercaseLetter && hasDigit && hasMinimumLength;
    }

    return (
        <>
            <Header/>
            <main
                className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-center items-center overflow-y-hidden">
                <p className="text-black text-4xl font-custom ml-10 mt-10">Your profile: </p>
                <p className="text-white text-sm ml-10 mt-4">You can change your data but need to enter existing
                    password or enter new</p>
                <form
                    className="mb-auto mt-10 flex flex-col justify-center items-center"
                    onSubmit={async (event) => {
                        event.preventDefault();
                        await handleUpdate();
                    }}
                >
                    <MyInput
                        placeholder="First Name"
                        type="text"
                        value={firstName}
                        maxLength={25}
                        key={1}
                        setValue={setFirstName}
                    />
                    <MyInput
                        placeholder="Last Name"
                        type="text"
                        value={lastName}
                        maxLength={25}
                        key={2}
                        setValue={setLastName}
                    />
                    <MyInput
                        placeholder="Email"
                        type="email"
                        value={email}
                        maxLength={30}
                        key={3}
                        setValue={setEmail}
                    />
                    <MyInput
                        placeholder="Password"
                        type="password"
                        value={password}
                        maxLength={25}
                        key={4}
                        setValue={setPassword}
                    />
                    <select
                        name="model"
                        id="model"
                        className="block w-full max-w-[340px] px-4 py-2 mt-1 leading-normal bg-white border border-gray-300 rounded-md
                focus:border-black focus:outline-none focus:shadow-outline overflow-y-scroll"
                        value={selectedModelId}
                        onChange={(e) => {
                            e.preventDefault();
                            setSelectedModelId(e.target.value);
                        }}
                    >
                        {carModels?.map((model: Model) => (
                            <option
                                key={model.id}
                                value={model.id}
                            >
                                {model.name}
                            </option>
                        ))}
                    </select>
                    {error && <p className="text-white text-2xl mt-4 font-bold"> {error} </p>}
                    {isLoading && <p className="text-white text-2xl mt-4 font-semibold"> Loading...</p>}
                    {isError && <p className="text-white text-2xl mt-4 font-bold"> Some error occurred </p>}
                    <div className="flex items-center justify-between w-full max-w-[340px] mt-2">
                        <button
                            type="submit"
                            className="bg-black text-white font-custom px-4 py-2"
                        >
                            Update
                        </button>
                        <p onClick={() => clearUser()}
                           className="text-black bg-white py-2 px-4 font-custom cursor-pointer">
                            <Link to='/login'>
                                Logout
                            </Link>
                        </p>
                    </div>
                </form>
            </main>
        </>
    );
}
