import { useState, useEffect, useMemo } from 'react'
import { Link, useMatches } from 'react-router-dom'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { RootState, useSelector } from '@/store'
import { Route, Meta } from '@/router/types'

function getAllBreadcrumbList(
  menuList: Route[],
  parent: Route[] = [],
  result: Recordable<Route[]> = {}
) {
  for (const item of menuList) {
    result[item.name] = [...parent, item]
    if (item.children) getAllBreadcrumbList(item.children, result[item.name], result)
  }
  return result
}

const renderTitle = (item: Route, isLink: boolean = true) => {
  const title = item.meta?.title || ''
  return { title: isLink ? <Link to={item.path}>{title}</Link> : title }
}

const Breadcrumb = () => {
  const matches = useMatches()
  const menuList = useSelector((state: RootState) => state.permission.menuList)
  const breadcrumbAllList = useMemo(() => getAllBreadcrumbList(menuList), [menuList])

  const [breadcrumbList, setBreadcrumbList] = useState<ItemType[]>([])

  useEffect(() => {
    const { name } = (matches[matches.length - 1].data as Meta) || {}

    if (!name) return

    const list = breadcrumbAllList[name] || []

    const antdBreadcrumbList = list.map((item, index) => {
      // 最后一个面包屑不可点击
      if (index === list.length - 1) return renderTitle(item, false)

      if (item.children?.length) {
        const items = item.children.filter((child) => !child.meta?.hide)
        return {
          ...renderTitle(item),
          dropdownProps: { arrow: true },
          menu: {
            items: items.map((child) => renderTitle(child)),
          },
        }
      }

      return renderTitle(item)
    })

    setBreadcrumbList(antdBreadcrumbList)
  }, [matches])

  return <AntdBreadcrumb items={breadcrumbList}></AntdBreadcrumb>
}

export default Breadcrumb
