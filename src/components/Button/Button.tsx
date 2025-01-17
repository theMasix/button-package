import React, {FC} from 'react';
import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import {LoadingProps} from "./Button.types";
import Condition from "../Condition";
import {Icon} from "../InternalIcons/Icon";
import { tv } from 'tailwind-variants'

const button= tv({
    base: 'flex justify-center items-center gap-2 font-bold min-w-[64px] px-4',
    variants: {
        color: {
            primary: 'text-primary-main',
            secondary: 'text-secondary-main'
        },
        size: {
            sm: 'h-9',
            md: 'h-10',
            lg: 'h-12'
        },
        rounded: {
            true: 'rounded-full',
            false: 'rounded-lg'
        },
        fullWidth: {
            true: 'w-full'
        },
        variant: {
            contained: '',
            text: 'bg-transparent',
            outlined: 'border bg-white',
            elevation: 'shadow-md bg-white'
        },
        disabled: {
            true: 'bg-disabled-main text-disabled-text border-0 cursor-not-allowed'
        }
    },
    compoundVariants: [
        {
            color: ['primary', 'secondary'],
            variant: 'outlined',
            className: 'border-current'
        },
        {
            color: ['primary'],
            variant: 'contained',
            className: 'text-white bg-primary-main'
        },
        {
            color: ['secondary'],
            variant: 'contained',
            className: 'text-white bg-secondary-main'
        }
    ]
})

const Loading:FC<LoadingProps> = () => (
   <span>Loading...</span>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            color = 'primary',
            fullWidth = true,
            icon,
            iconDirection,
            loading = false,
            rounded = false,
            size = 'md',
            variant = 'contained',
            disabled,
            className,
            ...props
        },
        ref,
    ) => {
        const renderContent = loading ? <Loading
            color={color}
            disabled={disabled}
            size={size}
            variant={variant}
        /> : children;

        return (
            <button {...props} className={button({
                color,
                size,
                rounded,
                fullWidth,
                variant,
                disabled,
                className
            })}>
                <Condition.If condition={iconDirection === 'start'}>
                     <Condition.Then>
                         <Icon />
                     </Condition.Then>
                </Condition.If>
                {renderContent}
                <Condition.If condition={iconDirection === 'end'}>
                    <Condition.Then>
                        <Icon />
                    </Condition.Then>
                </Condition.If>
            </button>
        );
    },
);

export default Button;
