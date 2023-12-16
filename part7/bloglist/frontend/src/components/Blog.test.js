import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component tests', () => {
    let component
    const mockHandleUpdate = jest.fn()
    const mockHandleDelete = jest.fn()

    beforeEach(() => {
        const blog = {
            title: 'Title',
            author: 'Author',
            url: 'url',
            likes: 5
        }
        component = render(
            <Blog blog={blog} updateBlog={mockHandleUpdate} deleteBlog={mockHandleDelete}/>
        )
    })

    test('5.13 - Title and Author present, no URL or likes', () => {
        component.debug()

        const div = component.container.querySelector('.blog')
        // Has title and author
        expect(div).toHaveTextContent(
            'Title'
        )
        expect(div).toHaveTextContent(
            'Author'
        )

        // Doesn't have url or likes
        expect(div).not.toHaveTextContent(
            'url'
        )
        expect(div).not.toHaveTextContent(
            'Like count'
        )
    })

    test('5.14 clicking the button shows url and likes', () => {

        const showButton = component.getByText('Show details \u2193')
        fireEvent.click(showButton)
    
        component.debug()
    
        const hideButton = component.getByText('Hide \u2191')
        expect(hideButton).toBeDefined()
    
        const div = component.container.querySelector('.blogDetails')
        expect(div).toBeDefined()
    
        expect(div).toHaveTextContent(
          'url'
        )
        expect(div).toHaveTextContent(
          'Like count'
        )
      })

      test('5.15 Clicking like button twice calls twice the event handler', () => {

        const showButton = component.getByText('Show details \u2193')
        fireEvent.click(showButton)
    
        const likeButton = component.container.querySelector('.likeButton')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
    
        expect(mockHandleUpdate.mock.calls).toHaveLength(2)
      })

})
