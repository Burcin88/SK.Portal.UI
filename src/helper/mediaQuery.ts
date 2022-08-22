import { useMediaQuery } from 'react-responsive'

export const MediaQuery = {

  getScreenWidth: () => {

    let width = '';
    if (useMediaQuery({ query: '(min-width: 1224px)' })) { width = '100%' }
    if (useMediaQuery({ query: '(min-width: 1824px)' })) { width = '100%' }
    if (useMediaQuery({ query: '(max-width: 1224px)' })) { width = '100%' }
    if (useMediaQuery({ query: '(orientation: portrait)' })) { width = '100%' }
    if (useMediaQuery({ query: '(min-resolution: 2dppx)' })) { width = '100%' }
    return width;
  }
}