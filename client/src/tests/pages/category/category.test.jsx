import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import CategoryPosts from './CategoryPosts'; // ajuste o caminho conforme necessário

jest.mock('axios'); // mock do axios

describe('CategoryPosts component', () => {
    const mockPosts = [
        {
            _id: '1',
            thumbnail: 'thumbnail.jpg',
            category: 'Tech',
            title: 'Sample Post',
            desc: 'This is a sample post',
            creator: 'user123',
            createdAt: '2024-06-30T12:00:00Z'
        }
    ];

    beforeEach(() => {
        axios.get.mockResolvedValueOnce({ data: mockPosts }); // mock da resposta da requisição axios
    });

    it('should render posts when category is provided', async () => {
        const { getByText, getByTestId } = render(
            <MemoryRouter initialEntries={['/categories/Tech']}>
                <Route path="/categories/:category">
                    <CategoryPosts />
                </Route>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1); // verifica se axios.get foi chamado uma vez
            expect(getByTestId('loader')).toBeInTheDocument(); // verifica se o loader está sendo exibido enquanto os posts são carregados
        });

        await act(async () => {
            await waitFor(() => {
                expect(getByTestId('loader')).not.toBeInTheDocument(); // verifica se o loader não está mais sendo exibido após os posts serem carregados
                expect(getByText('Sample Post')).toBeInTheDocument(); // verifica se o título do post está sendo renderizado
            });
        });
    });

    it('should render no posts found message when no posts are available', async () => {
        axios.get.mockResolvedValueOnce({ data: [] }); // mock da resposta vazia da requisição axios

        const { getByText } = render(
            <MemoryRouter initialEntries={['/categories/Tech']}>
                <Route path="/categories/:category">
                    <CategoryPosts />
                </Route>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1); // verifica se axios.get foi chamado uma vez
            expect(getByText('No posts found')).toBeInTheDocument(); // verifica se a mensagem de nenhum post encontrado está sendo renderizada
        });
    });
});