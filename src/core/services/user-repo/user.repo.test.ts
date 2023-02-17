import { USER, USER2 } from '../../../features/data/usermock';
import { User } from '../../../features/models/user.model';
import { UsersRepo } from './user.repo';
describe('Given a User Repo', () => {
    const mockData = [USER, USER2];
    const repo = new UsersRepo();
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });
    });

    test('Then we can instantiate it', () => {
        expect(repo).toBeInstanceOf(UsersRepo);
    });

    describe('When we use Users load method', () => {
        test('Then we received the Users content', async () => {
            const data = await repo.load();
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(mockData);
        });
        test('If there is NO DATA, we received a rejected promise', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load();
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe('When we use create method', () => {
        test(`Then if the data is VALID, we received the new User 
            created in the repo with its own new id`, async () => {
            const mockNewTaskPayload: Partial<User> = {
                name: 'New User',
                email: 'Test email',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockNewTaskPayload),
            });

            const data = await repo.create(mockNewTaskPayload);
            expect(data).toHaveProperty('name', mockNewTaskPayload.name);
            expect(data).toHaveProperty('email', mockNewTaskPayload.email);
        });
        test(`Then if the data is NOT VALID, we received a rejected promise`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });

            await expect(async () => {
                await repo.create({});
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
    describe('When we use update method', () => {
        test(`Then if the ID is VALID, we received the USER 
            updated in the repo`, async () => {
            const updatePayload: Partial<User> = {
                uid: mockData[0].uid,
                name: 'Lisa',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(updatePayload),
            });
            const data = await repo.update(updatePayload);
            expect(data).toHaveProperty('name', updatePayload.name);
        });
        test(`Then if there is NOT ID, we received a null`, async () => {
            await expect(async () => {
                await repo.update({});
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });
        test(`Then if the ID is NOT VALID, we received a null`, async () => {
            const updatePayload: Partial<User> = {
                uid: 'bad',
                name: 'Lisa',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.update(updatePayload);
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
