import React from 'react';
import './styles.scss';

interface HeaderProps {
    buttonAction: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Header: React.FC<HeaderProps> = ({ buttonAction }) => {

    return (
        <div className="header">
            <h1>Tic Tac Toe</h1>
            <button onClick={buttonAction}>New Game</button>
        </div>
    );
};

export default Header;