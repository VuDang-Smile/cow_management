import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/Card'
import { userNewsList } from '../../mocks/user'

export default function NewsDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const item = useMemo(()=> userNewsList.find(n=> n.id === id), [id])

  if(!item){
    return (
      <div className="user-home">
        <div className="home-panel">
          <Card title="ニュース">
            <div className="muted">記事が見つかりませんでした。</div>
            <div className="actions" style={{ marginTop: 8 }}>
              <button className="btn light" onClick={()=> navigate(-1)}>戻る</button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="user-home">
      <div className="home-panel">
        <Card title={item.categoryJa} rightSlot={<span className="muted">{formatDate(item.publishedAt)}</span>}>
          <div className="grid" style={{ gap: 12 }}>
            <div className="news-detail-cover" style={{ backgroundImage:`url(${item.imageUrl})` }} aria-label={item.titleJa} />
            <h2 style={{ margin: 0 }}>{item.titleJa}</h2>
            <div className="muted">{item.sourceName ?? 'ミルクチェーン'}</div>
            {item.contentJa?.map((p, idx)=> (
              <p key={idx} style={{ margin: '6px 0' }}>{p}</p>
            ))}
            {item.tagsJa && item.tagsJa.length > 0 && (
              <div className="row" style={{ flexWrap:'wrap' }}>
                {item.tagsJa.map(t=> <span key={t} className="pill">#{t}</span>)}
              </div>
            )}
            <div className="actions">
              <button className="btn light" onClick={()=> navigate(-1)}>戻る</button>
            </div>
          </div>
        </Card>
      </div>
      <style>{css}</style>
    </div>
  )
}

function formatDate(iso: string){
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth()+1).padStart(2,'0')
  const day = String(d.getDate()).padStart(2,'0')
  return `${y}/${m}/${day}`
}

const css = `
.news-detail-cover{
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
}
@media (min-width: 768px){
  .news-detail-cover{ height: 260px; }
}
`


