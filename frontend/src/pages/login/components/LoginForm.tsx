import MyInput from "../../general/MyInput.tsx";
import {useState} from "react";
import {LoginUserDto} from "../../../models/dto/user/login-user.dto.ts";
import {useLoginUserMutation} from "../../../store/backendAPI/backend.api.ts";
import {useActions} from "../../../hooks/useActions.ts";
import {Link, useNavigate} from "react-router-dom";

export function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginUser, {isLoading, isError}] = useLoginUserMutation();
    const {setUser} = useActions();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const loginUserDto: LoginUserDto = {
            email: email,
            password: password,
        }

        const res = await loginUser(loginUserDto);
        if ('data' in res) {
            setUser(res.data);
            navigate('/home')
        } else if ('error' in res) {
            console.log(res.error);
        }
    }
    return (
        <form className="mb-auto mt-10 flex flex-col justify-center items-center"
              onSubmit={async (event) => {
                  event.preventDefault();
                  await handleSubmit();
              }}
        >
            <p className="text-white font-custom text-3xl mb-2">Login</p>
            <MyInput
                placeholder="Email"
                type="email"
                value={email}
                maxLength={30}
                key={1}
                setValue={setEmail}
            />
            <MyInput
                placeholder="Password"
                type="password"
                value={password}
                maxLength={25}
                key={2}
                setValue={setPassword}
            />
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
                    <Link to='/'>
                        Registration
                    </Link>
                </p></div>
        </form>
    );
}
