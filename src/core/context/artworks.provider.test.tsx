import { render } from '@testing-library/react';
import { ArtworkContextProvider } from './artworks.provider';
import * as useArtworks from '../../hooks/use.artworks';
import { getAuth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
jest.mock('../../config.ts')

describe('Given PlaceContextProvider', () => {
    describe('When we use it', () => {
        test('Then it should call the custom hook usePlaces', () => {
            const spyuseArtworks = jest.spyOn(useArtworks, 'useArtworks');
            render(
                <ArtworkContextProvider>
                    <></>
                </ArtworkContextProvider>
            );
            expect(spyuseArtworks).toHaveBeenCalled();
        });
    });
});
