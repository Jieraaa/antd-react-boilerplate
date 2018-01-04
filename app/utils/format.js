/**
 * Created by yueer on 16/10/19.
 */

String.prototype.format=function()
{
  if(arguments.length==0) return this;
  for(let s=this, i=0; i<arguments.length; i++)
    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
  return s;
};

export default String.prototype.format;