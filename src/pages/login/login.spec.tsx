import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './login';

describe("Login page", () => {

    it("should render with required fields", async () => {

        // ARRANGE
        render(<LoginPage />);    

        // ACT


        // ASSERT

        // screen provide 3 types of methods :-
        // get : if contect not found throw error;
        // find : for async;
        // query : same as get by but will return null if content not found.

        expect(screen.getByText('Sign In')).
        toBeInTheDocument();
        expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: "Login" })).toBeInTheDocument();
        expect(screen.getByText(/Forgot password/)).toBeInTheDocument()
    })

})