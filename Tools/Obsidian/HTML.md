---
tags: HTML
---

# 表格
<table style="width:100%">
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
* 表格合并
<table>
  <tr>
    <th colspan="2">Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>43</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>57</td>
  </tr>
</table>

<table>
  <tr>
    <th>Name</th>
    <td>Jill</td>
  </tr>
  <tr>
    <th rowspan="2">Phone</th>
    <td>555-1234</td>
  </tr>
  <tr>
    <td>555-8745</td>
</tr>
</table>

 <table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table> 

 <table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr style="height:200px">
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table> 

|     表格     |         描述         |
|:------------:|:--------------------:|
|  `<table>`   |       定义表格       |
| `<caption>`  |     定义表格标题     |
|    `<th>`    |    定义表格的表头    |
|    `<tr>`    |     定义表格的行     |
|    `<td>`    |     定义表格单元     |
|  `<thead>`   |    定义表格的页眉    |
|  `<tbody>`   |    定义表格的主体    |
|  `<tfoot>`   |    定义表格的页脚    |
|   `<col>`    | 定义用于表格列的属性 |
| `<colgroup>` |    定义表格列的组    |
|  `rowspan`   |       跨行合并       |
| `colspan`             |           跨列合并           |
# 表格属性
 | 属性名        | 属性值                    | 描述                                      |
 | :-------------: | :-------------------------: | ----------------------------------------- |
 | `align`       | `left`、`center`、`right` | 规定表格相对周围元素的对齐方式            |
 | `border`        | $1$ 或 `""`               | 表格单元是否有边框，默认为 `""`，没有边框 |
 | `cellpadding` | 像素值                    | 规定单元边沿与其内容的空白, 默认 $1$ 像素 |
 | `cellspacing` | 像素值                    | 规定单元表格之间的空白，默认 $2$ 像素     |
 | `width`              |       像素值或者百分比                    |           规定表格的宽度                                |
