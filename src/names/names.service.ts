import { Injectable } from '@nestjs/common';
import { Name } from './entities/names.entity';

@Injectable()
export class NamesService {
    private names: Name[] = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
    ]  
    findAll(): Name[] {
        return this.names;
    }

    findOne(id: number): Name {
        return this.names.find(name => name.id === id);
    }

    create(name: Name): Name {
        this.names.push(name);
        return name;
    }
    update(id: number, name: Name): Name {
        const index = this.names.findIndex(name => name.id === id);
        this.names[index] = name;
        return name;
    }

    remove(id: number): void {
        const index = this.names.findIndex(name => name.id === id);
        this.names.splice(index, 1);
    }
    
}

