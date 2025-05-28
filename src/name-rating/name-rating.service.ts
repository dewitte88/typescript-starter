import { Injectable } from '@nestjs/common';
import { NamesService } from 'src/names/names.service';

@Injectable()
export class NameRatingService {
    constructor(private readonly NamesService: NamesService) {} 
}
