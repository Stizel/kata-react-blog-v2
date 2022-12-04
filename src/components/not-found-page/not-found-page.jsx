import notFoundStyle from './not-found-page.module.scss'

import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className={notFoundStyle.main}>
      This page doesn't exist. Go <Link to="/">home</Link>
    </div>
  )
}

export {NotFoundPage};
