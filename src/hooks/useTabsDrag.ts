import { useDispatch } from '@/store'
import { sortTabs } from '@/store/modules/tabs'
import Sortable from 'sortablejs'

export const useTabsDrag = () => {
  // 只能在 函数组件的顶层 调用
  const dispatch = useDispatch()

  const initTabsDrag = () => {
    // 被拖动元素的父级元素
    const el = document.querySelectorAll('.tabs .ant-tabs-nav-list')?.[0] as HTMLElement
    if (!el) return

    Sortable.create(el, {
      animation: 300,
      onEnd: (event) => {
        const { oldIndex, newIndex } = event
        if (oldIndex === newIndex) return
        dispatch(sortTabs({ oldIndex, newIndex }))
      },
    })
  }

  return {
    initTabsDrag,
  }
}
