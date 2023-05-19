export interface ICssVariables {
    bodyBackgroundColor: string
    headerFooterBackground: string
    textColor: string
    borderColor: string
    contentBg: string
    navCard: string
    formBackground: string
    formBackgroundDark: string
    bodyBackgroundColorDark: string
    headerFooterBackgroundDark: string
    textColorDark: string
    borderColorDark: string
    contentBgDark: string
    navCardDark: string
    backgroundItemForm: string,
    backgroundItemFormDark: string,
    buttonBackground: string
    buttonBackgroundDark: string
    navText: string

}

export const setCssVariables = (overwrite?: (cssVariables: ICssVariables) => void) => {

    document.cssVariables = {
        bodyBackgroundColor: '#edf1f5',
        borderColor: '#dfe4ea',
        contentBg: '#fffcfc',
        headerFooterBackground: '#edf1f5',
        navCard: '#fffcfc',
        textColor: '#fffff',
        formBackground: '#e9e9e9',
        backgroundItemForm: 'whitesmoke',
        buttonBackground: '#80838b',
        navText: '#b2b9bf',
        buttonBackgroundDark: '#686e7b',
        backgroundItemFormDark: '#5b6178',
        formBackgroundDark: '#353846',
        bodyBackgroundColorDark: '#31343e',
        borderColorDark: '#5b5b67',
        contentBgDark: ' #2f323e',
        headerFooterBackgroundDark: '#31343e',
        navCardDark: ' #2f323e',
        textColorDark: '#b2b9bf',
    }

    overwrite?.(document.cssVariables)

    const root = document.documentElement

    root.style.setProperty('--light-body-background', document.cssVariables.bodyBackgroundColor)
    root.style.setProperty('--light-header-footer', document.cssVariables.headerFooterBackground)
    root.style.setProperty('--light-text-color', document.cssVariables.textColor)
    root.style.setProperty('--light-border-color', document.cssVariables.borderColor)
    root.style.setProperty('--light-content-background', document.cssVariables.contentBg)
    root.style.setProperty('--light-nav-card', document.cssVariables.navCard)
    root.style.setProperty('--light-form-background', document.cssVariables.formBackground)
    root.style.setProperty('--light-form-item-background', document.cssVariables.backgroundItemForm)
    root.style.setProperty('--light-button-background', document.cssVariables.buttonBackground)

    root.style.setProperty('--dark-button-background', document.cssVariables.buttonBackgroundDark)
    root.style.setProperty('--dark-form-item-background', document.cssVariables.backgroundItemFormDark)
    root.style.setProperty('--dark-form-background', document.cssVariables.formBackgroundDark)
    root.style.setProperty('--dark-body-background', document.cssVariables.bodyBackgroundColorDark)
    root.style.setProperty('--dark-header-footer', document.cssVariables.headerFooterBackgroundDark)
    root.style.setProperty('--dark-text-color', document.cssVariables.textColorDark)
    root.style.setProperty('--dark-border-color', document.cssVariables.borderColorDark)
    root.style.setProperty('--dark-content-background', document.cssVariables.contentBgDark)
    root.style.setProperty('--dark-nav-card', document.cssVariables.navCardDark)
    root.style.setProperty('--dark-nav-text', document.cssVariables.navText)
}