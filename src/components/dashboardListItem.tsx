import Link from 'next/link'
import style from '../styles/DashboardListItem.module.scss'

// import "./dashboardListItem.scss";
interface Props {
  destinyPath: string
  icon: any
  content: string
  optionalFunction?: any
}
export default function DashboardListItem (props: Props) {
  const { destinyPath, icon, content, optionalFunction } = props
  return (
    <Link href={destinyPath}>
      <a onClick={optionalFunction} className={style.links}>
        {' '}
        {icon}
        {content}
      </a>
    </Link>
  )
}
