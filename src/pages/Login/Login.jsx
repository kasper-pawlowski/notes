import { Button, Container, Input, Loading, Row, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import { BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const { user } = useAuth();

    useEffect(() => {
        user && navigate('/');
    }, [user]);

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
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
                Log in
            </Text>
            <form onSubmit={handleSubmit(handleLogin)}>
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

                <Button type="submit" css={{ width: '100%' }} disabled={loading ? true : false} auto>
                    {loading ? <Loading size="sm" /> : 'Log in'}
                </Button>
                <Button flat css={{ width: '100%' }} auto icon={<BsGoogle />} onClick={signInWithGoogle}>
                    Log in with Google
                </Button>
            </form>
            <Text weight="light">
                Don't have an account?
                <Link to="/signup">
                    <Text b> Sign up</Text>
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

export default Login;
