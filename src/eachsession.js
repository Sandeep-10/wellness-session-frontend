import './eachsession.css';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const EachSession = (props) => {
    const {each,deleteSession} = props;
    const {title, status, created_at,id} = each;
    const date = created_at.split(' ')[0];
    const deleteId = () => {
        deleteSession(id);
    }
    
    
    return (
        <>
            <li className="session-card">
            <Link to={`/sessions/${id}`}>
            <div className="session-heading">
                <h1 className="session-titlee">{title}</h1>
                <span className={`session-status ${status}`}>
                    {status}
                </span>
            </div>
            </Link>
            <div className="session-details">
                <span className="session-date">{date}</span>
            </div>
            <MdDelete onClick={deleteId} />
        </li>
        </>
    );
};

export default EachSession;