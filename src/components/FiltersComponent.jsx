function FiltersComponent({ formik }) {
  return (
    <>
      <div className="container-fluids">
        <div className="row my-2">
          <div className="col-md-3">
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="title..."
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <select
              name="title-query"
              id="title-query"
              value={formik.values["title-query"]}
              onChange={formik.handleChange}
              className="form-select"
            >
              <option value="">Search title Query</option>
              <option value="starts">Starts With</option>
              <option value="ends">Ends With</option>
              <option value="contains">Contains With</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              id="body"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              placeholder="body..."
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <select
              name="body-query"
              id="body-query"
              value={formik.values["body-query"]}
              onChange={formik.handleChange}
              className="form-select"
            >
              <option value="">Search body Query</option>
              <option value="starts">Starts With</option>
              <option value="ends">Ends With</option>
              <option value="contains">Contains With</option>
            </select>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-md-12">
            <div className="row">
              <h5>CreatedAt</h5>
              <div className="col-md-6">
                <label htmlFor="createdAt-starts">Created Start</label>
                <input
                  type="date"
                  name="createdAt-starts"
                  id="createdAt-starts"
                  value={formik.values["createdAt-starts"]}
                  onChange={formik.handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="createdAt-ends">Created End</label>
                <input
                  type="date"
                  name="createdAt-ends"
                  id="createdAt-ends"
                  value={formik.values["createdAt-ends"]}
                  onChange={formik.handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltersComponent;
