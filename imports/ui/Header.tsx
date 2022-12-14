import { Meteor } from 'meteor/meteor';
import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
    const logout = () => Meteor.logout();


    return (
        <div className="header-outer">
            <div className="header container">
                <div className="header__title">
                    <span>Лабораторная работа №3. Коновалов К.О.</span>
                </div>
                <div className="header__line" />
                <div className="header__links">
                    <Link className="header__link" to="/specialization">Специализации</Link>
                    //<Link className="header__link" to="/movingInformation">Информация о перемещении</Link>
                    //<Link className="header__link" to="/materials">Материалы</Link>
                    //<Link className="header__link" to="/staff">Персонал</Link>
                    //<Link className="header__link" to="/masters">Мастера</Link>
                    //<Link className="header__link" to="/service">Услуги</Link>
                    //<Link className="header__link" to="/client">Клиенты</Link>
                    //<Link className="header__link" to="/login" onClick={logout}>Авторизация</Link>
                </div>
            </div>
        </div>
    )
}