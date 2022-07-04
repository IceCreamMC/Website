/* empty css              */const y=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}};y();const s={"Sharkur-1.19":{title:"Sharkur",api_endpoint:"sharkur",api_version:"1.19",github:"SharkurMC/Sharkur",desc:"Active development for Minecraft 1.19.",limit:10,cache:null}};function $(t,a){return window.fetch(`https://crodylus.cezarsalat.tk/api/v2/projects/${t}/version_group/${a}/builds`).then(e=>e.status>=400?null:e.json())}function f(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}document.addEventListener("DOMContentLoaded",()=>{let t="",a="";Object.keys(s).length;for(const e in s){const r=s[e].title;t+=`<li class="tab"><a href="#${e}">${r}</a></li>`,a+=`
        <div id="${e}" class="col s12">
          <div class="download-content">
            <div class="download-desc">${s[e].desc}</div>
              <div class="progress">
                  <div class="indeterminate"></div>
              </div>
          </div>
        </div>`}document.getElementById("content").innerHTML=`
      <div class="col s12">
        <ul id="downloads-tabs" class="tabs">
          ${t}
        </ul>
      </div>
      ${a}`;for(const e in s)$(s[e].api_endpoint,s[e].api_version).then(r=>{s[e].cache=r,L(e)}).catch(r=>{console.error(r),document.getElementById(e).innerText="Failed to load downloads."});M.Tabs.init(document.querySelector("#downloads-tabs"),{onShow:e=>{history.pushState(null,null,"#"+e.getAttribute("id"))}})});function L(t){const a=s[t].github,e=document.getElementById(t).querySelector(".download-content"),r=s[t].cache;if(r==null){e.innerText="Failed to load downloads.";return}let o="",i="";const d=r.builds.filter(n=>n.downloads&&n.downloads.application);let c,h=!1;d.sort((n,l)=>l.build-n.build).slice(0,s[t].limit).forEach(n=>{var b;let l="";(b=n.changes)==null||b.forEach(u=>{l+=`<span class="commit-hash">
                            [<a title="${f(u.summary)}" href="https://github.com/${a}/commit/${u.commit}" target="_blank">${f(u.commit.substring(0,7))}</a>]
                        </span>
                        ${f(u.summary).replace(/([^&])#([0-9]+)/gm,`$1<a target="_blank" href="https://github.com/${a}/issues/$2">#$2</a>`)}
                        <br>`}),l||(l="No changes"),c||(c=n.version),c!==n.version&&(c=n.version,i+=`<tr>
                        <td colspan="3">${v(s[t].api_endpoint)} ${n.version}</td>
                     </tr>`);const p=n.channel==="experimental";h=h||p,n.promoted;const w=p?"error":"",g=`<tr>
                        <td>
                            <a href="https://crodylus.cezarsalat.tk/api/v2/projects/${s[t].api_endpoint}/versions/${n.version}/builds/${n.build}/downloads/${n.downloads.application.name}"
                                class="download-jarvec" title="Version: ${n.version}
Channel: ${v(n.channel)}">
                                #${n.build}<i class="material-icons left">${w}</i>
                            </a>
                        </td>
                        <td data-build-id="${n.build}">
                            ${l}
                        </td>
                        <td>
                            ${new Date(n.time).toISOString().split("T")[0]}
                        </td>
                     </tr>`;n.promoted===!0?o+=g:i+=g}),i===""&&(i=`<tr class="no-builds-row">
                            <td colspan="4">No builds.</td>
                      </tr>`),e.innerHTML=`<div class="download-desc">${s[t].desc}</div>`;const m=`<div class="experimental-desc">
                                    <i class="material-icons left">error</i>
                                    <span>Builds marked in red are early, experimental builds. They are only recommended for usage on test servers and should be used with caution. <b>Backups are mandatory!</b></span>
                                </div>`;h&&(e.innerHTML+=m),o&&(e.innerHTML+=`
              <div class="builds-title">Promoted Builds</div>
              <table class="builds-table striped" style="margin-bottom: 15px">
                <thead>
                  <tr>
                    <th width="10%">Build</th>
                    <th width="75%">Changes</th>
                    <th width="10%">Date</th>
                    <th width="5%" title="The SHA256 of the jar, used to verify the integrity">SHA256</th>
                  </tr>
                </thead>
                <tbody>
                  ${o}
                </tbody>
              </table>
              
              <div class="builds-title" style="padding-bottom: 5px">Other Builds</div>
              `),e.innerHTML+=`
            <table class="builds-table striped">
              <thead style="visibility: collapse">
                <tr>
                  <th width="10%"></th>
                  <th width="75%"></th>
                  <th width="10%"></th>
                  <th width="5%"></th>
                </tr>
              </thead>
              <tbody>
                ${i}
              </tbody>
            </table>
            `,r.builds.length>s[t].limit&&(e.innerHTML+=`<a class="wide-btn btn light-blue darken-2 waves-effect waves-light white-text" onclick="loadMore('${t}')">More</a><br>`),s[t].api_endpoint==="paper"&&(e.innerHTML+='<a class="wide-btn btn grey darken-2 waves-effect waves-light" href="legacy">Legacy</a>'),h&&(e.innerHTML+=m)}function v(t){return t.charAt(0).toUpperCase()+t.slice(1)}
