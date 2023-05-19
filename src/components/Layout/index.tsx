import React from 'react'
import debounce from 'lodash.debounce'
import BreadCrumb from './BreadCrumb'
import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'
import { Input, Space } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../../context/useTheme'
import Components from '..'

const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
};
const Layout: React.FC = () => {
    const [theme, setTheme] = React.useState(getDefaultTheme());
    const handleChangeTheme = () => {
        const isCurrentDark = theme === 'dark';
        setTheme(isCurrentDark ? 'light' : 'dark');
        localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark')
    }

    return (
        <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
            <div className={`theme-${theme} `}>
                <Header />
                <Navbar />
                <BreadCrumb />
                <React.Suspense fallback={<Components.Loading />}>
                    <Content>
                        <div className='container'>
                            <Outlet />
                        </div>
                    </Content>
                </React.Suspense>
                <Footer />
            </div>
        </ThemeContext.Provider>
    )
}

export default Layout

interface IHeaderContent<T> {
    leftItem: React.ReactNode,
    isSearch?: boolean,
    callback?: (search: string) => void
    loading?: (isLoad: boolean) => void
    styleSearch?: React.CSSProperties
}


export const HeaderContent = <T,>(props: IHeaderContent<T>) => {
    const { leftItem, callback, loading, styleSearch, isSearch } = props

    const debounceSearch = debounce((
        search: string,
        onSearch?: (search: string) => void) => {
        onSearch?.(search)
        loading?.(false)
    }, 650)

    return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        {leftItem}
        {isSearch && <Space style={styleSearch}>
            <label>Search: </label>
            <Input onChange={e => {
                loading?.(true)
                debounceSearch(e.target.value, data => callback?.(data))
            }} />
        </Space>}
    </div>
}