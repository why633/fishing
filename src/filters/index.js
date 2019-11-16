/**
 * 计算钓技课堂标题
 */
export function classTitle (id) {
  console.log(id)
  const idMap = {
    '1': '黑坑',
    '2': '野钓',
    '3': '装备',
    '4': '路亚',
    '5': '海钓',
    '6': '杂谈'
  }
  console.log(idMap[id])
  return idMap[id]
}
