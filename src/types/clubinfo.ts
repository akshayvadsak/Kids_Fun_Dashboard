export interface ClubInfo {
	// Detalied club information
	clubName: string
	registerRole: string
	clubLinkAddress?: string
	clubCategories: Array<string>
	category?: Array<string> // sports
	category0?: Array<string> // music and art
	category1?: Array<string> // science and coding
	category2?: Array<string> // additonal categories from user
	streetAddress?: string
	city: string
	state: string
	postalCode: string
	country: string
	description: string
	clubContactName: string // main contact person name
	clubEmail: string
	clubEmailVerified?: boolean
	clubPhone?: string
	socialLink1?: string
	socialLink2?: string
	socialLink3?: string
	ageMin?: number
	ageMax?: number
	boy?: boolean
	girl?: boolean
	onlineClass?: boolean
	freetrialClass?: boolean
	beginnerClass?: boolean
	intermediateClass?: boolean
	advancedClass?: boolean
	privateClass?: boolean
	classSizeMin?: number // main contact person name
	classSizeMax?: number
	priceMin?: number
	priceMax?: number
	priceCurrency?: string
	priceUnit?: string // 'per month' 'per week' or 'per year'
	otherCost?: string
	photoUrls?: Array<string>
	photoThumbUrls?: Array<string>
	isVerified?: boolean
	updatedAt?: Date
	clubid?: string
	recommendations?: number
	active?: boolean
	views?: number
	createdAt?: Date
	numGroups?: number
	groups?: Array<GroupInfo> // array of group name
  }
  export interface GroupInfo {
	groupid?: number // returned by backend, can be ignored by now.
	name: string // group name
	parentLead?: string
	totalNum: number // total number of group members, default 0.
	groupImageUrl: string
  }
  
  export interface ClublistApiResponse {
	clubdocs: Array<ClubInfo>
	totalDocCount: number
	pageNum: number
	pageSize?: number
  }
  
  export interface ClubSimInfo {
	//simplified club information, used to store into user
	clubid?: string
	clubName: string
	clubEmail: string
	clubEmailVerified?: boolean
	photoURL?: string
	photoUrls?: Array<string>
	photoThumbUrls?: Array<string>
	clubLinkAddress?: string
	registerRole: string
	clubCategories: Array<string>
	category?: Array<string> // sports
	category0?: Array<string> // music and art
	category1?: Array<string> // science and coding
	category2?: Array<string> // additonal categories from user
	city: string
	state: string
	country: string
	postalCode: string
	priceCurrency?: string
	priceMin?: number
	priceMax?: number
	updatedAt?: Date
	createdAt?: Date
	active?: boolean
	//userrole: string
	recommendations?: number
	views?: number
	numGroups?: number
	groups?: Array<GroupInfo> // array of groups
  }
  