import { ICssVariables } from './CssVariables';

export { }

declare global {


    interface Document {

        cssVariables: ICssVariables
    }
}