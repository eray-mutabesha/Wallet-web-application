import Header from "./Header"

function SuccessBudget() {
  return (
 

<div id="main-wrapper">
<Header/>
  <div className="content-body">
    <div className="verification section-padding">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-xl-5 col-md-6">
            <div className="card">
              <div className="card-body identity-content">
                <form action="/budget">
                  <span className="icon"><i className="fi fi-bs-check" /></span>
                  <h4>Congratulation. Successfully your Budget added</h4>
                  <p>Efficiently provide access to installed base core competencies and end
                    end
                    data Interactively target equity.</p>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success pl-5 pr-5">Continue</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="footer">
    <div className="container">
      <div className="row">
        <div className="col-xl-6">
          <div className="copyright">
            <p>© Copyright
              <a href="#">Eray mutabesha</a> I All Rights Reserved
            </p>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="footer-social">
            <ul>
          
              <li><a href="https://x.com/ErayMutabesha"><i className="fi fi-brands-twitter" /></a></li>
              <li><a href="https://www.linkedin.com/in/eray-mutabesha-186240256/"><i className="fi fi-brands-linkedin" /></a></li>
        
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default SuccessBudget
