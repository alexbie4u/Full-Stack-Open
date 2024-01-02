const LandingPage = () => {
    return(
        <div className="container">
          <Notification/>
    
        <h2>Submit your blog</h2>
          <Togglable buttonLabel="Create new blog" buttonId="createNewBlogButton1" ref={newBlogFormRef}>
            <NewBlogForm />
          </Togglable>
    
            <BlogList blogs={blogs}/>
    
        <p>{user.name} logged in</p>
    
          <h3>Logout here:</h3>
    
          <Button variant="primary" type="submit" onClick={() => handleLogout(notificationDispatch, userDispatch)} >Logout</Button>
    
          <User/>
        </div>  
        )
}

export default LandingPage