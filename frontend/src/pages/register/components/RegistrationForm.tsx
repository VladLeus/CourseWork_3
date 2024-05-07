import MyInput from "../../general/MyInput.tsx";
import {useState} from "react";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {Model} from "../../../models/car-model.ts";
import {CreateUserDto} from "../../../models/dto/create-user.dto.ts";
import {useCreateUserMutation} from "../../../store/backendAPI/backend.api.ts";
import {useActions} from "../../../hooks/useActions.ts";
import {Link, useNavigate} from "react-router-dom";

export function RegistrationForm() {
    const {carModels} = useAppSelector(state => state.backend);
    const {setUser} = useActions();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [selectedModelId, setSelectedModelId] = useState<string>(carModels[0].id);
    const [error, setError] = useState<string | undefined>();
    const [createUser, {isLoading, isError}] = useCreateUserMutation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
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

        const res = await createUser(createUserDto);
        if ('data' in res) {
            setUser(res.data);
            navigate('/home')
        } else if ('error' in res) {
            console.log(res.error)
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
        <form
            className="mb-auto mt-10 flex flex-col justify-center items-center"
            onSubmit={async (event) => {
                event.preventDefault();
                await handleSubmit();
            }}
        >
            <p className="text-white font-custom text-3xl mb-2">Registration</p>
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
            { error && <p className="text-white text-2xl mt-4 font-bold"> {error} </p> }
            { isLoading && <p className="text-white text-2xl mt-4 font-semibold"> Loading...</p> }
            { isError && <p className="text-white text-2xl mt-4 font-bold"> Some error occurred </p> }
            <div className="flex items-center justify-between w-full max-w-[340px] mt-2">
                <button
                    type="submit"
                    className="bg-black text-white font-custom px-4 py-2"
                >
                    Submit
                </button>

                <p className="text-black bg-white py-2 px-4 font-custom cursor-pointer">
                    <Link to='/login'>
                        Login
                    </Link>
                </p>
            </div>
        </form>
    );
}
