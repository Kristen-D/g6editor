var gridData = {rows:100,rowData:[
  {id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
  {id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
  {id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
  {id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
  {id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
  {id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
{id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
{id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
{id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
{id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
{id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
  {id:1,events:"钓鱼网站",store:"1.1.1.1",grade:2},
  {id:2,events:"木马",store:"1.1.1.2",grade:1}]};


  var gridData2 = {rows:98,rowData:[
    {alarm_id:1,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
    {alarm_id:2,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
    {alarm_id:3,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
    {alarm_id:4,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
    {alarm_id:5,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
    {alarm_id:6,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
  {alarm_id:7,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
  {alarm_id:8,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
  {alarm_id:9,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
  {alarm_id:10,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
  {alarm_id:11,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
    {alarm_id:12,alarm_name:"钓鱼网站",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2},
    {alarm_id:13,alarm_name:"木马",alarm_time:"2016-12-13 13:20:30",is_link:"是",alarm_context:"无",do:2}]};

export default {
  loadGridData (cb,url,params) {
    // alert(url);
    if (url=="2"){
      setTimeout(() => cb(gridData2), 0)
    }else{
      setTimeout(() => cb(gridData), 0)
    }

  }
}
