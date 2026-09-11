const GlobalVideoModal = () => {
  return (
    <div
      className="modal fade"
      id="globalVideoModal"
      tabIndex={-1}
      role="dialog"
      aria-label="Video Preview"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content comon-modal-content">
          <div className="modal-header">
            <button type="button" data-bs-dismiss="modal" aria-label="Close">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="ratio ratio-16x9">
              <iframe
                id="globalVideoIFrame"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalVideoModal;
