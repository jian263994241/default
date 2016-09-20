
fis.match('p/tpl.html',{
  parser: htmlList([
    {pageName:'index', filename:'index.html', title:'首页'},
    {pageName:'other', filename:'other.html',title:'更多'}
  ])
})
