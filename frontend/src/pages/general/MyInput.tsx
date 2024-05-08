import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/useAppSelector.ts";

interface MyInputProps {
    placeholder: string,
    type: string,
    maxLength: number,
    value: string,
    setValue: (value: string) => void,
}

const MyInput: React.FC<MyInputProps> = (props) => {
    const {user} = useAppSelector(state => state.backend);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(props.value);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [pattern, setPattern] = useState<string | undefined>();
    const divClasses: string = !isActive ?
        "max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol border-[1px] border-solid rounded-2xl bg-white py-0 px-4 h-14 text-lg"
        : "max-w-[340px] w-full mx-auto mb-4 border-black border-2 border-solid rounded-2xl bg-white py-0 px-4 h-14 text-lg";
    const labelClasses: string = `cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-38px] ${
        (isHovered || inputValue !== '' || isActive) ? 'top-[-52px] text-sm' : ''
    } select-none`;

    const minLenght = (): number => {
        if (props.type === 'password') {
            if (user?.dto_user_role === 'Client') {
                return 8;
            } else {
                return 2;
            }
        }
        return 2;
    }

    const definePattern = () => {
        switch (props.type) {
            case "text":
                setPattern('^[a-zA-Z]+$');
                break;
            case "email":
                setPattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
                break;
            case "password":
                setPattern(undefined);
                break;
            default:
                setPattern(undefined);
                break;
        }
    }

    useEffect(() => {
        definePattern()
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        props.setValue(event.target.value);
    };

    return (
        <div
            className={divClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input
                type={props.type}
                value={inputValue}
                pattern={pattern}
                onChange={handleInputChange}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                minLength={minLenght()}
                maxLength={props.maxLength}
                required={true}
                className="normal-case bg-none text-left border-0 text-black h-10 w-full text-lg rounded-none mt-3 p-0 box-border outline-none"
            />
            <label
                className={labelClasses}
            >
                {props.placeholder}
            </label>
        </div>
    );
}

export default MyInput;
