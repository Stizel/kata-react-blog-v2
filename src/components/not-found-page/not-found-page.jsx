import { Link } from 'react-router-dom'

import notFoundStyle from './not-found-page.module.scss'

function NotFoundPage() {
  return (
    <div className={notFoundStyle.main}>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      This page doesn't exist. Go <Link to="/">home</Link>
    </div>
  )
}

export default NotFoundPage
