import { fmt } from '../../config';

export const getTagsSchema = {
	description: 'Api to fetch the all tags',
	tags: ['tag','fetch'],
	summary: 'fetch tag api',
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: fmt.getSwaggerResponse({
				type: 'array',
                items : {
                    type : 'object',
                    properties : {
                        id : {type : 'string'},
                        name : {type : 'string'},
                    }
                }
				
			}),
		},
	},
};

export const getBlogsSchema = {
	description: 'Api to fetch the all blogs',
	tags: ['blog','fetch'],
	summary: 'fetch blog api',
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: fmt.getSwaggerResponse({
				type: 'array',
                items : {
                    type : 'object',
                    properties : {
                        id : {type : 'string'},
                        title : {type : 'string'},
                        subtitle : {
                            type  : 'string',
                            optional : true,
                            additionalProperties: true,
                        },
                        imageUrl : {
                            type : 'string',
                        },
                        tag : {
                            type : 'object',
                            properties : {
                                id : {type :'string'},
                                name : {type :'string'},
                            }
                        },
                        user : {
                            type : 'object',
                            properties : {
                                id : {type :'string'},
                                name : {type :'string'},
                            }
                        },
                        additionalProperties: true,
                    }
                }
				
			}),
		},
	},
};


export const createBlogsSchema = {
	description: 'Api to create the blog',
	tags: ['blog','create'],
	summary: 'create blog api',
	body: {
        type: 'object',
        properties : {
            title : {type : 'string'},
            subtitle : {
                type  : 'string',
            },
            image : {
                type : 'string',
            },
            tagId : {type : 'string'},
        },
        required : ['title','subtitle','image','tagId']
	},
};
