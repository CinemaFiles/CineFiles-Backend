import bcrypt from 'bcrypt';

export const Hashing = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const CompareHash = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}
