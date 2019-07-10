import request from '@/utils/request'

export function getList(items_branch,items_years) {
  let param = new URLSearchParams();
  param.append('items_branch', items_branch);
  param.append('items_years', items_years);
  return request({
    url: '/items/getItemsAll',
    method: 'post',
    data: param
  })
}
