import { Button, Container, Input, Loading, Row, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Signup.css';
import { BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const { user } = useAuth();

    useEffect(() => {
        user && navigate('/');
    }, [user]);

    const handleSignup = async ({ email, password, username }) => {
        setLoading(true);
        let { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username,
                },
            },
        });
        error && (console.log(error.message), setLoading(false), setError(error.message));
    };

    async function signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        error && (console.log(error.message), setError(error.message));
    }

    return (
        <Container
            display="flex"
            alignItems="center"
            direction="column"
            css={{ gap: '20px', marginTop: '30px', paddingBottom: '60px', padding: '0' }}>
            <Text b h2>
                Sign up
            </Text>
            <form onSubmit={handleSubmit(handleSignup)}>
                <Input
                    className="input"
                    {...register('username')}
                    size="lg"
                    type="text"
                    aria-label="username"
                    placeholder="Username"
                    required={true}
                    css={{
                        width: '100%',
                        '@sm': {
                            width: '300px',
                        },
                    }}
                />
                <Input
                    className="input"
                    {...register('email')}
                    size="lg"
                    type="email"
                    aria-label="email"
                    placeholder="E-mail"
                    required={true}
                    css={{
                        width: '100%',
                        '@sm': {
                            width: '300px',
                        },
                    }}
                />
                <Input.Password
                    {...register('password')}
                    size="lg"
                    type="password"
                    aria-label="password"
                    placeholder="Password"
                    required={true}
                    css={{
                        width: '100%',
                        '@sm': {
                            width: '300px',
                        },
                    }}
                />
                {/* <Row
                    display="flex"
                    justify="end"
                    css={{
                        width: '100%',
                        '@sm': {
                            width: '300px',
                        },
                    }}>
                    <Text auto>Forgot password?</Text>
                </Row> */}

                <Button type="submit" css={{ width: '100%' }} auto disabled={loading ? true : false}>
                    {loading ? <Loading size="sm" /> : 'Sign up'}
                </Button>
                <Button flat css={{ width: '100%' }} auto icon={<BsGoogle />} onClick={signInWithGoogle}>
                    Sign up with Google
                </Button>
            </form>
            <Text weight="light">
                Already have an account?
                <Link to="/login">
                    <Text b> Log in</Text>
                </Link>
            </Text>
            {error && (
                <Text blockquote color="error" css={{ textAlign: 'center' }}>
                    {error}
                </Text>
            )}
        </Container>
    );
};

export default Signup;
