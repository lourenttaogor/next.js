'use client';

import { useState } from 'react';
import {
    AtSymbolIcon,
    KeyIcon,
    UserIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import Link from 'next/link';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            // Simulate signup - in production, this would call an API endpoint
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setSuccessMessage(
                'Account created successfully! You can now log in with your credentials.'
            );
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            setErrors({ submit: 'An error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="mb-3 text-2xl font-bold">Create your account</h1>
                <p className="mb-6 text-sm text-gray-600">
                    Join us today to get started
                </p>

                {successMessage && (
                    <div className="mb-4 flex items-center gap-2 rounded-md bg-green-100 p-3">
                        <div className="text-sm text-green-700">{successMessage}</div>
                    </div>
                )}

                {errors.submit && (
                    <div className="mb-4 flex items-center gap-2 rounded-md bg-red-100 p-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <div className="text-sm text-red-700">{errors.submit}</div>
                    </div>
                )}

                <div className="w-full space-y-4">
                    {/* Name Field */}
                    <div>
                        <label
                            className="mb-2 block text-xs font-medium text-gray-900"
                            htmlFor="name"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                className={`peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${errors.name ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                id="name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            className="mb-2 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className={`peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            className="mb-2 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className={`peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${errors.password ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label
                            className="mb-2 block text-xs font-medium text-gray-900"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                className={`peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    className="mt-6 w-full"
                    type="submit"
                    disabled={isLoading}
                    aria-disabled={isLoading}
                >
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                    <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </form>
    );
}
